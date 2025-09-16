// QR码扫描器组件，提供摄像头扫码功能
"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import QrScanner from "qr-scanner";

interface QRScannerProps {
    onScanSuccess: (result: string) => void;
    onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const qrScannerRef = useRef<QrScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.destroy();
            }
        };
    }, []);

    const startScanning = async () => {
        try {
            setError(null);
            setIsScanning(true);

            if (!videoRef.current) {
                throw new Error("视频元素未找到");
            }

            // 检查摄像头权限
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setHasPermission(true);

            // 停止之前的流
            stream.getTracks().forEach(track => track.stop());

            // 创建QR扫描器
            qrScannerRef.current = new QrScanner(
                videoRef.current,
                (result) => {
                    onScanSuccess(result.data);
                    stopScanning();
                },
                {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    preferredCamera: 'environment',
                }
            );

            await qrScannerRef.current.start();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "启动摄像头失败";
            setError(errorMessage);
            setIsScanning(false);
            onScanError?.(errorMessage);
        }
    };

    const stopScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
            qrScannerRef.current = null;
        }
        setIsScanning(false);
    };

    const requestPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setHasPermission(true);
            setError(null);
        } catch (err) {
            setHasPermission(false);
            setError("需要摄像头权限才能进行扫码");
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-center">扫描QR码</h2>
                <p className="text-small text-default-500 text-center">
                    将QR码对准摄像头进行扫描
                </p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                    />
                    {!isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="text-center">
                                <div className="text-4xl mb-2">📷</div>
                                <p className="text-sm text-gray-600">点击开始扫描</p>
                            </div>
                        </div>
                    )}
                    {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-2 border-primary border-dashed rounded-lg flex items-center justify-center">
                                <Spinner size="lg" color="primary" />
                            </div>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                        <p className="text-danger-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex gap-2">
                    {hasPermission === false ? (
                        <Button
                            color="primary"
                            variant="solid"
                            className="flex-1"
                            onPress={requestPermission}
                        >
                            授权摄像头
                        </Button>
                    ) : (
                        <>
                            {!isScanning ? (
                                <Button
                                    color="primary"
                                    variant="solid"
                                    className="flex-1"
                                    onPress={startScanning}
                                >
                                    开始扫描
                                </Button>
                            ) : (
                                <Button
                                    color="danger"
                                    variant="solid"
                                    className="flex-1"
                                    onPress={stopScanning}
                                >
                                    停止扫描
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
