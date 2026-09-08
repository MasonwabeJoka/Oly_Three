import Button from "@/components/Button";

interface Props {
  containerClassName?: string;
}

const PublishButton = ({ containerClassName }: Props) => (
  <div className={containerClassName}>
    <Button
      children="Publish"
      buttonVariant="primary"
      buttonSize="large"
      type="submit"
      ariaLabel="Publish Button"

      dashboard
    />
  </div>
);

export default PublishButton;
