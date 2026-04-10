"""Quick script to view all database records."""
import sqlite3

conn = sqlite3.connect("banksec.db")
cur = conn.cursor()

# Tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
print("=== TABLES ===")
print([r[0] for r in cur.fetchall()])

# Employees
print("\n=== EMPLOYEES ===")
cur.execute("SELECT id, name, role, department, risk_score, risk_level, status FROM employees")
for r in cur.fetchall():
    print(f"  {r[0]} | {r[1]:20s} | {r[2]:22s} | {r[3]:15s} | Score:{r[4]:3d} | {r[5]:6s} | {r[6]}")

# Alerts
print("\n=== ALERTS ===")
cur.execute("SELECT id, employee_id, action, risk_score, status FROM alerts")
for r in cur.fetchall():
    print(f"  {r[0]} | {r[1]} | {r[2]:30s} | Score:{r[3]:3d} | {r[4]}")

# Cases
print("\n=== CASES ===")
cur.execute("SELECT id, employee, status, investigator FROM cases")
for r in cur.fetchall():
    print(f"  {r[0]} | {r[1]:30s} | {r[2]:12s} | {r[3]}")

# Logs (last 5)
print("\n=== SYSTEM LOGS (latest 5) ===")
cur.execute("SELECT id, timestamp, level, source, message FROM system_logs LIMIT 5")
for r in cur.fetchall():
    print(f"  {r[0]} | {r[1]} | {r[2]:8s} | {r[3]:16s} | {r[4][:60]}")

# Settings
print("\n=== SETTINGS ===")
cur.execute("SELECT * FROM settings")
for r in cur.fetchall():
    print(f"  High threshold: {r[1]} | Medium threshold: {r[2]} | Drift: {r[3]} | Peer: {r[4]} | Off-hours: {r[5]}")

conn.close()
