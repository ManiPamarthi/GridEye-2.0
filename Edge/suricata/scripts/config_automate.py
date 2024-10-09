import yaml
import json
import sys


config_methods = {
    'home_net': lambda suri, data: suri['vars']['address-groups'].update({'HOME_NET': data}),
    'external_net': lambda suri, data: suri['vars']['address-groups'].update({'EXTERNAL_NET': data}),
    'http_ports': lambda suri, data: suri['vars']['port-groups'].update({'HTTP_PORTS': data}),
    'shellcode_ports': lambda suri, data: suri['vars']['port-groups'].update({'SHELLCODE_PORTS': data}),
    'eve_log': lambda suri, data: suri['outputs'][find_ind(suri, 'eve-log')]['eve-log'].update({'enabled': data}),
    'http_log': lambda suri, data: suri['outputs'][find_ind(suri, 'http-log')]['http-log'].update({'enabled': data}),
    'pcap_log': lambda suri, data: suri['outputs'][find_ind(suri, 'pcap-log')]['pcap-log'].update({'enabled': data}),
    'drop_log': lambda suri, data: suri['outputs'][find_ind(suri, 'drop')]['drop'].update({'enabled': data}),
    'unix_command': lambda suri, data: suri['unix-command'].update({'enabled': data}),
    'stream_memcap': lambda suri, data: suri['stream'].update({'memcap': data}),
    'stream_inline': lambda suri, data: suri['stream'].update({'inline': data}),
    'stream_checksum': lambda suri, data: suri['stream'].update({'checksum-validation': data}),
    'default_rule_path': lambda suri, data: suri.update({'default-rule-path': data}),
    'custom_rule_file': lambda suri, data: suri['rule-files'].append(data),
    'af_packet_interface': lambda suri, data: suri['af-packet'][0].update({'interface': data}),
    'af_packet_threads': lambda suri, data: suri['af-packet'][0].update({'threads': data}),
    'af_packet_ringsize': lambda suri, data: suri['af-packet'][0].update({'ringsize': data}),
    'af_packet_buffsize': lambda suri, data: suri['af-packet'][0].update({'buffsize': data}),
}
#delete_methods = {
#    'pfring': lambda suri, suri.pop("pfring"),
#}

def set_config_value(suricata, conf_data, conf_attribute):
    config_methods[conf_attribute](suricata, conf_data)

def del_config_value(suricata, conf_attribute):
    #delete_methods[conf_attribute](suricata)
    suricata.pop(conf_attribute)

def find_ind(suricata, attribute):
    # need this because suricata['outputs'] is a list and not a dict
    key_list = [k for i in range(len(suricata['outputs'])) for k in suricata['outputs'][i].keys()]
    ind = key_list.index(attribute)
    return ind


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: {} suricata.yaml custom_conf.json".format(sys.argv[0]))
        print("Usage: {} suricata.yaml custom_conf.json suricata_backup.yaml".format(sys.argv[0]))
    else:
        filename = sys.argv[1]
        custom_conf = sys.argv[2]
        with open(filename, 'r') as f:
            suricata = yaml.load(f, Loader=yaml.FullLoader)
            print(json.dumps(suricata, indent=4))
        if len(sys.argv) > 3:
            backup_file = sys.argv[3]
            with open(backup_file, 'w') as f:
                backup_conf = yaml.dump(suricata, f)
        with open(custom_conf, 'r') as f:
            custom = json.load(f)
            print(json.dumps(custom, indent=4))
        for attribute in custom['update'].keys():
            set_config_value(suricata, custom['update'][attribute], attribute)
        for attribute in custom['delete'].keys():
            suricata.pop(attribute)
            #del_config_value(suricata, attribute)
        with open(filename, 'w') as f:
            updated_conf = yaml.dump(suricata, f, sort_keys=False)
