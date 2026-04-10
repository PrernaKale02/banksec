import React, { useState, useEffect, useRef } from 'react';
import { Download, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { logActivity } from '../api/logActivity';

const TOTAL_RECORDS = 15000;
const TOTAL_BATCHES = 8;
const RECORDS_PER_BATCH = Math.ceil(TOTAL_RECORDS / TOTAL_BATCHES);
const DOWNLOAD_DURATION_MS = 12000; // 12 seconds total
const BATCH_INTERVAL_MS = DOWNLOAD_DURATION_MS / TOTAL_BATCHES;

export default function DownloadProgress({ employee, onGoBack }) {
  const [progress, setProgress] = useState(0);
  const [batches, setBatches] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const batchContainerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let batchIndex = 0;

    // Smooth progress bar animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DOWNLOAD_DURATION_MS) * 100, 100);
      setProgress(Math.round(pct));

      if (pct >= 100) {
        clearInterval(progressInterval);
      }
    }, 100);

    // Send batch logs at intervals
    const sendBatch = () => {
      if (cancelled || batchIndex >= TOTAL_BATCHES) {
        if (batchIndex >= TOTAL_BATCHES && !cancelled) {
          // All batches done — mark complete
          setTimeout(() => {
            if (!cancelled) {
              setIsComplete(true);

              // Send completion log
              logActivity({
                employeeId: employee.id,
                action: 'BULK_DATA_EXPORT',
                details: `Bulk export completed: ${TOTAL_RECORDS.toLocaleString()} records downloaded successfully (1.2 GB)`,
                resource: 'Customer Database',
                dataVolumeMb: 1200,
              });
            }
          }, 1000);
        }
        return;
      }

      batchIndex++;
      const recordsSoFar = Math.min(batchIndex * RECORDS_PER_BATCH, TOTAL_RECORDS);
      const sizeMb = Math.round((recordsSoFar / TOTAL_RECORDS) * 1200);

      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      // Add batch to UI
      setBatches((prev) => [
        ...prev,
        {
          id: batchIndex,
          text: `Batch ${batchIndex}/${TOTAL_BATCHES} — ${recordsSoFar.toLocaleString()} records exported`,
          size: `${sizeMb} MB`,
          time: timeStr,
        },
      ]);

      // Send rapid activity log to backend (this triggers anomaly detection!)
      logActivity({
        employeeId: employee.id,
        action: 'BULK_DATA_EXPORT',
        details: `Exporting batch ${batchIndex}/${TOTAL_BATCHES}: ${recordsSoFar.toLocaleString()} customer records (${sizeMb} MB)`,
        resource: 'Customer Database',
        dataVolumeMb: sizeMb,
      });

      // Schedule next batch
      setTimeout(sendBatch, BATCH_INTERVAL_MS);
    };

    // Start first batch after a short delay
    setTimeout(sendBatch, 800);

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
    };
  }, [employee]);

  // Auto-scroll batches container
  useEffect(() => {
    if (batchContainerRef.current) {
      batchContainerRef.current.scrollTop = batchContainerRef.current.scrollHeight;
    }
  }, [batches]);

  return (
    <div className="download-page">
      <div className="download-card">
        {/* Icon */}
        <div className={`download-icon ${isComplete ? 'warning' : 'active'}`}>
          {isComplete ? <AlertTriangle /> : <Download />}
        </div>

        {/* Title */}
        <h2>{isComplete ? 'Export Complete' : 'Exporting Customer Records...'}</h2>
        <p className="subtitle">
          {isComplete
            ? `${TOTAL_RECORDS.toLocaleString()} records have been downloaded (1.2 GB)`
            : `Downloading ${TOTAL_RECORDS.toLocaleString()} records from the customer database`}
        </p>

        {/* Progress Bar */}
        <div className="progress-wrapper">
          <div className="progress-bar-bg">
            <div
              className={`progress-bar-fill ${isComplete ? 'danger' : ''}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span className={`percent ${isComplete ? 'danger-text' : ''}`}>{progress}%</span>
            <span>
              {Math.round((progress / 100) * TOTAL_RECORDS).toLocaleString()} / {TOTAL_RECORDS.toLocaleString()} records
            </span>
          </div>
        </div>

        {/* Batch Logs */}
        {batches.length > 0 && (
          <div className="download-batches" ref={batchContainerRef}>
            {batches.map((batch) => (
              <div className="batch-entry" key={batch.id}>
                <span className="batch-dot"></span>
                <span className="batch-text">
                  <strong>Batch {batch.id}</strong> — {batch.size} exported
                </span>
                <span className="batch-time">{batch.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning when complete */}
        {isComplete && (
          <>
            <div className="download-warning">
              <AlertTriangle />
              <p>
                This large data export has been logged and flagged to the security team.
                All bulk operations are subject to audit review under Policy SEC-4.2.
              </p>
            </div>

            <div className="download-complete-actions">
              <button className="btn btn-secondary" onClick={onGoBack}>
                <ArrowLeft size={15} /> Back to Records
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
