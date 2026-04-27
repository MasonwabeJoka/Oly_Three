import Button from "@/components/Buttons";

interface Props {
  containerClassName?: string;
}

const PublishButton = ({ containerClassName }: Props) => (
  <div className={containerClassName}>
    <Button
      buttonChildren="Publish"
      buttonType="primary"
      buttonSize="large"
      name="publish-btn"
      type="submit"
      ariaLabel="Publish Button"
      autoFocus={false}
      disabled={false}
      dashboard
    />
  </div>
);

export default PublishButton;
