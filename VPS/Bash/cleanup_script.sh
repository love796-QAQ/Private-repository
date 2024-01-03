#!/bin/bash

# 清理 APT 缓存
sudo apt-get clean

# 清理旧的内核
sudo apt-get autoremove -y

# 清理临时文件
sudo rm -rf /tmp/*
sudo rm -rf /var/tmp/*

# 清理系统日志
sudo journalctl --vacuum-time=7d

# 清理旧的 systemd 日志
sudo journalctl --vacuum-size=50M

# 清理 apt 本地存储
sudo apt-get autoclean -y
