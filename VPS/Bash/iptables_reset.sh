#!/bin/bash

# 清除所有规则
iptables -F

# 设置默认策略为 ACCEPT
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
