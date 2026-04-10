const API_BASE = 'http://localhost:8000';

/**
 * Sends an activity log to the BankSec AI backend.
 * Every action on the Bank Portal calls this function silently.
 */
export async function logActivity({ employeeId, action, details, resource, dataVolumeMb = 0, ipAddress = '192.168.1.50' }) {
  try {
    const response = await fetch(`${API_BASE}/api/activity/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employee_id: employeeId,
        action,
        details,
        resource,
        data_volume_mb: dataVolumeMb,
        ip_address: ipAddress,
      }),
    });

    if (!response.ok) {
      console.warn('[BankPortal] Failed to send activity log:', response.status);
      return null;
    }

    const data = await response.json();
    console.log(`[BankPortal] Activity logged: ${action}`, data);
    return data;
  } catch (error) {
    console.warn('[BankPortal] Backend unreachable:', error.message);
    return null;
  }
}
