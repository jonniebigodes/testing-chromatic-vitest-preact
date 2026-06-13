import styled from "styled-components";
import { useEffect, useState } from 'preact/hooks';
import type { ComponentPropsWithoutRef } from "react";

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  onStatusChange?: (details: {
    status: "loading" | "loaded" | "error";
  }) => void;
  ids?: Partial<{ root: string; image: string; fallback: string }>;
  rootProps?: Omit<ComponentPropsWithoutRef<"div">, "id">;
}

const AvatarRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing[12]};
  height: ${({ theme }) => theme.spacing[12]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.slate500};
  color: ${({ theme }) => theme.color.white};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize[16]};
  overflow: hidden;
`;

const AvatarImage = styled.img<{ $visible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ $visible }) => ($visible ? "block" : "none")};
`;

export const Avatar = ({
  src,
  alt,
  fallback,
  onStatusChange,
  ids,
  rootProps,
}: AvatarProps) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error",
  );

  useEffect(() => {
    const next = src ? "loading" : "error";
    setStatus(next);
    onStatusChange?.({ status: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const updateStatus = (next: "loading" | "loaded" | "error") => {
    setStatus(next);
    onStatusChange?.({ status: next });
  };

  const showImage = !!src && status !== "error";

  return (
    <AvatarRoot id={ids?.root} {...rootProps} style={rootProps?.style}>
      {!showImage && <span id={ids?.fallback}>{fallback}</span>}
      {src && (
        <AvatarImage
          id={ids?.image}
          src={src}
          alt={alt}
          $visible={status === "loaded"}
          onLoad={() => updateStatus("loaded")}
          onError={() => updateStatus("error")}
        />
      )}
    </AvatarRoot>
  );
};
