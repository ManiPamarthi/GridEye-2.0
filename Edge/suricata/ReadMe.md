For adding the rules to suricata please move the rules in the following directory:

/usr/local/etc/suricata/rules (Check if it the same directory in suricata.yaml as "default-rule-path:")

Also change the following line in suricata.yaml:

rule-files:
  - /usr/local/etc/suricata/modbus.rules
  - /usr/local/etc/suricata/dnp3.rules
  - /usr/local/etc/suricata/industroyer.rules