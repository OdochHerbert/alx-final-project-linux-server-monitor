import subprocess

# Replace "your_network_name" with your actual Wi-Fi network name
network_name = "Ronnie's iPhone"

# Use subprocess to run the command to get Wi-Fi password
command = f'nmcli -s -g 802-11-wireless-security.psk connection show "{network_name}"'
command_output = subprocess.check_output(command, shell=True).decode("utf-8").strip()

if command_output:
    print(f"Wi-Fi password for {network_name}: {command_output}")
else:
    print(f"Could not find password for {network_name}.")

