// 扫码结果展示组件，显示扫描到的QR码内容
"use client";

import { Card, CardBody, CardHeader, Button, Chip, Divider } from "@heroui/react";
import { useState } from "react";

interface ScanResultProps {
    result: string;
    onScanAgain: () => void;
}

export default function ScanResult({ result, onScanAgain }: ScanResultProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("复制失败:", err);
        }
    };

    const isUrl = (text: string) => {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    };

    const isEmail = (text: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    };

    const isPhone = (text: string) => {
        return /^[\+]?[1-9][\d]{0,15}$/.test(text.replace(/[\s\-\(\)]/g, ""));
    };

    const getResultType = (text: string) => {
        if (isUrl(text)) return "链接";
        if (isEmail(text)) return "邮箱";
        if (isPhone(text)) return "电话";
        if (text.startsWith("WIFI:")) return "WiFi";
        if (text.startsWith("BEGIN:VCARD")) return "联系人";
        return "文本";
    };

    const handleAction = () => {
        if (isUrl(result)) {
            window.open(result, "_blank");
        } else if (isEmail(result)) {
            window.location.href = `mailto:${result}`;
        } else if (isPhone(result)) {
            window.location.href = `tel:${result}`;
        }
    };

    const canPerformAction = isUrl(result) || isEmail(result) || isPhone(result);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-semibold">扫描结果</h2>
                    <Chip color="success" variant="flat" size="sm">
                        {getResultType(result)}
                    </Chip>
                </div>
                <p className="text-small text-default-500">
                    扫描成功！以下是QR码内容：
                </p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm break-all whitespace-pre-wrap">
                        {result}
                    </p>
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={copyToClipboard}
                        className="w-full"
                    >
                        {copied ? "已复制!" : "复制内容"}
                    </Button>

                    {canPerformAction && (
                        <Button
                            color="secondary"
                            variant="solid"
                            onPress={handleAction}
                            className="w-full"
                        >
                            {isUrl(result) && "打开链接"}
                            {isEmail(result) && "发送邮件"}
                            {isPhone(result) && "拨打电话"}
                        </Button>
                    )}

                    <Button
                        color="default"
                        variant="bordered"
                        onPress={onScanAgain}
                        className="w-full"
                    >
                        重新扫描
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
