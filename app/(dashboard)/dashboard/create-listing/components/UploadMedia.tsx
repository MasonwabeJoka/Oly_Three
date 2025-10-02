

import UploadMediaClient from "./UploadMediaClient";

interface Props {
  onNext: () => void;
}
export default function UploadMedia({ onNext }: Props) {
  return <UploadMediaClient onNext={onNext} />;
}
