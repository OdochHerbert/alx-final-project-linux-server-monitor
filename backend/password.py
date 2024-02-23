import subprocess

# Use subprocess to run the command to get information about the current Wi-Fi connection
command_info = "nmcli -t -f NAME,DEVICE connection show --active"
command_output = subprocess.check_output(command_info, shell=True).decode("utf-8").strip()

# Extract the connection name and device from the command output
connection_info = command_output.split(":")
connection_name = connection_info[0].strip()
device_name = connection_info[1].strip()

# Use subprocess to run the command to get Wi-Fi password for the current connection
command_password = f'nmcli -s -g 802-11-wireless-security.psk connection show "{connection_name}"'
password_output = subprocess.check_output(command_password, shell=True).decode("utf-8").strip()

if password_output:
    print(f"Wi-Fi SSID/Network Name: {connection_name}")
    print(f"Wi-Fi password: {password_output}")
else:
    print(f"Could not find password for SSID/Network Name: {connection_name}.")

