"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import Big from "big.js";
import clsx from "clsx";
import { motion } from "motion/react";

import { Slider } from "@/components/ui/slider";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const MotionImage = motion.create(Image);

const containerHeight = 252;
const constraintsRadius = 100;

const maxScale = 10;
const scaleStep = 0.01;

interface ImageCropperProps {
  src: string;
  open: boolean;
  setOpen: (o: boolean) => void;
  onImageCrop: (url: string) => void;
  isPending?: boolean;
}

const ImageCropper = ({
  src,
  open,
  setOpen,
  onImageCrop,
  isPending,
}: ImageCropperProps) => {
  const container = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const mouseDown = useRef(false);
  const [maskCover, setMaskCover] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [scale, setScale] = useState(0);
  const [minScale, setMinScale] = useState(1);

  const constraints = useMemo(() => {
    if (!imgRef.current || !container.current) {
      return false;
    }
    const imgWidth = Big(imgRef.current.width);
    const imgHeight = Big(imgRef.current.height);

    const baseX = imgWidth.div(2).minus(Big(constraintsRadius));
    const baseBottom = Big(containerHeight)
      .div(2)
      .minus(Big(constraintsRadius));
    const baseTop = imgHeight.minus(
      Big(containerHeight).div(2).add(Big(constraintsRadius))
    );
    const delta = Big(scale).minus(1);

    return {
      top: -baseTop.add(imgHeight.times(delta).div(2)).toNumber(),
      left: -baseX.add(baseX.times(delta.times(2))).toNumber(),
      right: baseX.add(baseX.times(delta).times(2)).toNumber(),
      bottom: baseBottom.add(imgHeight.times(delta).div(2)).toNumber(),
    };
  }, [scale]);

  // 裁剪预览
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width } = container.current!.getBoundingClientRect();

      if (
        e.clientX > left &&
        e.clientX < left + width &&
        e.clientY > top &&
        e.clientY < top + containerHeight
      ) {
        setMaskCover(false);
      } else if (!mouseDown.current) {
        setMaskCover(true);
      }
    };
    const onMouseDown = () => {
      mouseDown.current = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      mouseDown.current = false;
      const { left, top, width } = container.current!.getBoundingClientRect();

      if (
        e.clientX > left &&
        e.clientX < left + width &&
        e.clientY > top &&
        e.clientY < top + containerHeight
      ) {
        setMaskCover(false);
      } else {
        setMaskCover(true);
      }
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const downScale = (nextScale: number) => {
    const {
      top: cTop,
      left: cLeft,
      width: cWidth,
    } = container.current!.getBoundingClientRect();
    const {
      top: imgTop,
      left: imgLeft,
      width: imgWidth,
      height: imgHeight,
    } = imgRef.current!.getBoundingClientRect();
    const ogImgWidth = imgRef.current!.width;
    const ogImgHeight = imgRef.current!.height;

    // 缩小后的图片宽高
    const newW = Big(ogImgWidth).times(Big(nextScale));
    const newH = Big(ogImgHeight).times(Big(nextScale));

    if (
      Big(constraintsRadius).times(2).gt(newW) ||
      Big(constraintsRadius).times(2).gt(newH)
    ) {
      return;
    }
    // 缩小后的图片 left top
    const newL = Big(imgLeft).add(Big(imgWidth).minus(Big(newW)).div(2));
    const newT = Big(imgTop).add(Big(imgHeight).minus(Big(newH)).div(2));

    // 限制范围
    const circleTop = Big(cTop)
      .add(Big(containerHeight / 2))
      .minus(constraintsRadius);
    const circleLeft = Big(cLeft)
      .add(Big(cWidth / 2))
      .minus(constraintsRadius);
    const circleRight = circleLeft.add(constraintsRadius * 2);
    const circleBottom = circleTop.add(constraintsRadius * 2);

    let x = 0;
    let y = 0;
    // 往离得近的一边移动
    if (newL.gte(circleLeft)) {
      x = Big(circleLeft)
        .minus(Big(cLeft).add(Big(ogImgWidth).div(2)).minus(Big(newW).div(2)))
        .toNumber();
      if (x === position.x) {
        x = x - 0.1;
      }
    }
    if (newT.gte(circleTop)) {
      y = Big(circleTop)
        .minus(Big(cTop).add(Big(ogImgHeight).div(2)).minus(Big(newH).div(2)))
        .toNumber();
      if (y === position.y) {
        y = y - 0.1;
      }
    }
    if (circleRight.gte(newL.add(newW))) {
      x = Big(circleRight)
        .minus(Big(cLeft).add(Big(ogImgWidth).div(2)).add(newW.div(2)))
        .toNumber();
      if (x === position.y) {
        x = x + 0.1;
      }
    }
    if (circleBottom.gte(newT.add(newH))) {
      y = Big(circleBottom)
        .minus(Big(cTop).add(Big(ogImgHeight).div(2)).add(newH.div(2)))
        .toNumber();
      if (y === position.y) {
        y = y + 0.1;
      }
    }

    setPosition({ x, y });
    setScale(nextScale);
  };

  const cropImage = async () => {
    const image = imgRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = constraintsRadius * 2;
    canvas.height = constraintsRadius * 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    const { left, top, width } = container.current!.getBoundingClientRect();
    const { left: iLeft, top: iTop } = image.getBoundingClientRect();

    const scaleX = image.naturalWidth / (image.width * scale);
    const scaleY = image.naturalHeight / (image.height * scale);

    ctx.imageSmoothingQuality = "high";
    ctx.save();

    ctx.drawImage(
      image,
      (left + width / 2 - constraintsRadius - iLeft) * scaleX,
      (top + containerHeight / 2 - constraintsRadius - iTop) * scaleY,
      constraintsRadius * 2 * scaleX,
      constraintsRadius * 2 * scaleY,
      0,
      0,
      constraintsRadius * 2,
      constraintsRadius * 2
    );

    ctx.restore();

    const url = canvas.toDataURL();
    onImageCrop(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Cropper
            <DialogDescription>
              You finaly awake, who are you?
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <div
            ref={container}
            className="relative flex h-[252px] w-full max-w-[400px] justify-center overflow-hidden rounded-xl"
            onWheel={(e) => {
              if (e.deltaY > 0) {
                downScale(Big(scale).minus(Big(e.deltaY).div(1000)).toNumber());
              } else {
                setScale((prev) => {
                  if (
                    Big(scale).minus(Big(e.deltaY).div(1000)).gt(Big(maxScale))
                  ) {
                    return prev;
                  }
                  return Big(prev).minus(Big(e.deltaY).div(1000)).toNumber();
                });
              }
            }}
          >
            <div className="border-background absolute h-[252px] w-full"></div>
            <MotionImage
              animate={{
                scale,
                ...position,
                transition: {
                  scale: { duration: 0.1 },
                },
              }}
              ref={imgRef}
              className="absolute w-full cursor-move"
              drag
              dragConstraints={constraints}
              dragElastic={0}
              dragMomentum={false}
              src={src}
              alt="img"
              width={400}
              height={600}
              onLoad={(e) => {
                const width = e.currentTarget.width;
                const height = e.currentTarget.height;

                // 初始缩放
                if (Big(constraintsRadius).times(2).gt(Big(height))) {
                  const nextS = Big(constraintsRadius)
                    .times(2)
                    .div(Big(height))
                    .toNumber();

                  setScale(nextS);
                  setMinScale(nextS);
                } else {
                  setScale(1);
                  setMinScale(
                    Big(1)
                      .div(Big(Math.min(width, height)))
                      .times(Big(constraintsRadius * 2))
                      .toNumber()
                  );
                }
                // 垂直居中
                setPosition({
                  x: 0,
                  y: Big(containerHeight)
                    .div(2)
                    .minus(Big(height).div(2))
                    .toNumber(),
                });
              }}
            />
            <div className="pointer-events-none absolute flex h-[252px] w-full items-center justify-center">
              <div
                className={clsx(
                  "absolute box-content h-[200px] w-[200px] rounded-full border-150 border-black/50",
                  {
                    "border-background!": maskCover,
                  }
                )}
              ></div>
            </div>
          </div>
        </div>
        <div className="my-4 flex justify-center">
          <Slider
            className="max-w-[400px]"
            value={[scale]}
            max={maxScale}
            min={minScale}
            step={scaleStep}
            onValueChange={(m) => {
              if (m[0] > scale) {
                if (m[0] <= maxScale) {
                  setScale(m[0]);
                }
              } else {
                downScale(m[0]);
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => {
              cropImage();
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
