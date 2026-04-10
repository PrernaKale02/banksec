"""
Dynamic Risk Score Calculator.

TO BE IMPLEMENTED BY MEMBER D:
- calculate_score() method: Multi-factor weighted risk score (0-100)

Weights:
    - Anomaly detection score:  40%
    - Off-hours activity flag:  20%
    - Data volume deviation:    20%
    - Failed login frequency:   10%
    - Restricted access:        10%
"""


class RiskScorer:
    """
    Calculates a dynamic risk score (0-100) for an employee
    based on multiple behavioral factors.
    """

    WEIGHTS = {
        "anomaly_score": 0.40,
        "off_hours": 0.20,
        "data_volume_deviation": 0.20,
        "failed_logins": 0.10,
        "restricted_access": 0.10,
    }

    def calculate_score(self, employee_data: dict) -> dict:
        """
        Calculate a risk score for an employee.

        Args:
            employee_data: dict with keys:
                - anomaly_confidence (float, 0-1)
                - login_hour (int, 0-23)
                - data_volume_mb (float)
                - peer_avg_volume_mb (float)
                - failed_logins (int)
                - accessed_restricted (bool)

        Returns:
            dict with keys:
                - total_score (int, 0-100)
                - risk_level (str: Low/Medium/High)
                - breakdown (dict of factor: score)
                - reasons (list[str])
        """
        # TODO: Member D implements this
        return {
            "total_score": 0,
            "risk_level": "Low",
            "breakdown": {},
            "reasons": []
        }


# Singleton instance
scorer = RiskScorer()
