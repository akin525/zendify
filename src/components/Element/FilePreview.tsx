interface FileViewerProps {
  fileUrl: string;
}

export const FilePreview: React.FC<FileViewerProps> = ({ fileUrl }) => {
  const isImage = () => {
    const fileExtension = fileUrl.split(".").pop()?.toLowerCase() ?? "";
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return true;
    } else {
      return false;
    }
  };

  const openInNewTab = () => {
    window.open(fileUrl, "blank");
  };

  return (
    <>
      <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl border ">
        {isImage() ? (
          <img
            src={fileUrl}
            alt="KYC"
            className="h-full w-full object-cover brightness-50"
          />
        ) : (
          <p className="text-xs">*No preview available</p>
        )}

        <button
          onClick={openInNewTab}
          className="absolute bottom-6 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white transition-all duration-150 hover:bg-primary/80"
        >
          View
        </button>
      </div>
    </>
  );
};
