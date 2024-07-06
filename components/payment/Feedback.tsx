import Feedback from './Feedback.module.scss'
const FeedbackPage = () => {
  return (
    <form>
      <textarea defaultValue="Great transaction, item as described!" readOnly />
      <button type="button">Submit Feedback</button>
    </form>
  );
};

export default FeedbackPage;
