#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
脚本名称：generate_gallery.py
功能描述：
    扫描 public/images/gallery 目录下的所有子文件夹（每个子文件夹视为一个相册类别），
    将子文件夹中的图片文件信息整理成符合前端需要的 gallery.json 数据文件，
    输出到脚本所在目录。

数据生成规则：
    - id        ：从 "1" 开始递增的字符串
    - title     ：图片文件名（不含扩展名）
    - date      ：图片文件的最后修改时间，格式 YYYY-MM-DD
    - description：固定为空字符串（预留扩展）
    - imageUrl  ："/images/gallery/子文件夹名/图片文件名"
    - category  ：子文件夹名称，若包含 "-" 则取 "-" 之后的部分（如 "20240330-缙云山" → "缙云山"）
"""

import os
import json
import datetime


def get_photo_date(filepath):
    """
    获取图片文件的最后修改日期，并格式化为 YYYY-MM-DD。

    参数：
        filepath (str)：图片文件的完整路径

    返回：
        str：日期字符串，例如 "2026-08-20"
    """
    mtime = os.path.getmtime(filepath)          # 获取文件修改时间戳
    dt = datetime.datetime.fromtimestamp(mtime) # 转换为 datetime 对象
    return dt.strftime('%Y-%m-%d')              # 格式化为日期字符串


def generate_gallery_json():
    """
    主函数：扫描图片目录，生成 gallery.json 文件。

    执行流程：
        1. 检查根目录是否存在，若不存在则报错退出。
        2. 遍历 gallery 下的第一级子目录（每个子目录代表一个相册）。
        3. 对每个子目录：
            a. 提取 category 名称（去除日期前缀等）。
            b. 遍历子目录中的所有文件，筛选图片格式。
            c. 为每张图片构建一个数据条目。
        4. 将所有条目组装成 {"photos": [...]} 结构。
        5. 以 UTF-8 编码写入 gallery.json（缩进 2 空格，保留中文）。
    """
    # ---------- 1. 定义根目录路径 ----------
    gallery_root = 'public/images/gallery'

    # ---------- 2. 检查路径有效性 ----------
    if not os.path.isdir(gallery_root):
        print(f"错误：目录 '{gallery_root}' 不存在，请确保脚本在项目根目录运行。")
        return

    # ---------- 3. 初始化数据容器 ----------
    photos = []            # 存放所有图片条目
    photo_id = 1           # 自增 ID 起始值

    # 支持的图片文件扩展名（全部转小写便于匹配）
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp')

    # ---------- 4. 遍历第一级子文件夹（相册类别） ----------
    for subdir in os.listdir(gallery_root):
        subdir_path = os.path.join(gallery_root, subdir)

        # 仅处理目录，跳过文件
        if not os.path.isdir(subdir_path):
            continue

        # ---------- 4.1 提取 category 名称 ----------
        # 需求：若文件夹名包含 "-"，取 "-" 之后的部分（例如 "20240330-缙云山" → "缙云山"）
        # 使用 split('-', 1) 只分割第一个 "-"，避免后面可能出现的 "-" 被误切
        if '-' in subdir:
            category = subdir.split('-', 1)[-1]
        else:
            category = subdir

        # ---------- 4.2 遍历子文件夹中的文件 ----------
        for filename in os.listdir(subdir_path):
            filepath = os.path.join(subdir_path, filename)

            # 跳过子目录，只处理文件
            if not os.path.isfile(filepath):
                continue

            # 检查文件扩展名是否为图片格式
            ext = os.path.splitext(filename)[1].lower()
            if ext not in image_extensions:
                continue

            # ---------- 4.3 构建单张图片的数据条目 ----------
            # 标题：去除扩展名的文件名
            title = os.path.splitext(filename)[0]

            # 日期：取自文件的修改时间
            date = get_photo_date(filepath)

            # 图片 URL：使用 Web 路径格式，并统一使用正斜杠 "/"（兼容 Windows 路径）
            # 格式：/images/gallery/子文件夹名/图片文件名
            image_url = f"/images/gallery/{subdir}/{filename}".replace('\\', '/')

            # 组装条目
            photo_entry = {
                "id": str(photo_id),          # ID 转为字符串
                "title": title,
                "date": date,
                "description": "",            # 描述留空，后续可手动填写或扩展
                "imageUrl": image_url,
                "category": category
            }

            photos.append(photo_entry)
            photo_id += 1   # ID 自增

    # ---------- 5. 生成 JSON 并写入文件 ----------
    output = {"photos": photos}   # 构建最终 JSON 结构

    # 以 UTF-8 编码写入，ensure_ascii=False 保证中文字符正常显示
    with open('./data/gallery.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # 输出统计信息
    print(f"✅ 已生成 gallery.json，共处理 {len(photos)} 张照片。")


# ---------- 6. 脚本入口 ----------
if __name__ == '__main__':
    generate_gallery_json()