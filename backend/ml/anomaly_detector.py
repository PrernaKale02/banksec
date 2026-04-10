"""
Anomaly Detection Engine using Isolation Forest.

TO BE IMPLEMENTED BY MEMBER D:
- train() method: Fit the model on historical normal employee activity data
- predict() method: Given an activity, return anomaly flag + confidence + reasons
"""

import numpy as np


class AnomalyDetector:
    """
    Isolation Forest based anomaly detector for employee behavior.

    Features used:
        - login_hour (0-23)
        - session_duration_min (float)
        - download_count (int)
        - data_volume_mb (float)
        - failed_logins (int)
        - accessed_restricted (0 or 1)
    """

    def __init__(self):
        self.model = None
        self.is_trained = False

    def train(self, training_data: np.ndarray):
        """
        Fit the Isolation Forest model on historical 'normal' activity data.

        Args:
            training_data: numpy array of shape (n_samples, 6) with columns:
                [login_hour, session_duration, download_count,
                 data_volume_mb, failed_logins, accessed_restricted]
        """
        # TODO: Member D implements this
        # Use sklearn.ensemble.IsolationForest
        # Set contamination from config.ANOMALY_CONTAMINATION
        pass

    def predict(self, activity: dict) -> dict:
        """
        Predict if an activity is anomalous.

        Args:
            activity: dict with keys matching the feature columns

        Returns:
            dict with keys: is_anomaly (bool), confidence (float), reasons (list[str])
        """
        # TODO: Member D implements this
        return {
            "is_anomaly": False,
            "confidence": 0.0,
            "reasons": []
        }


# Singleton instance — initialized in main.py on startup
detector = AnomalyDetector()
