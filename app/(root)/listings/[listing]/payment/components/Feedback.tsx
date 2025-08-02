import Feedback from './Feedback.module.scss'
const FeedbackPage = () => {
  return (
    <div>
      <textarea defaultValue="Great transaction, item as described!" readOnly />
      <button type="button">Submit Feedback</button>
    </div>
  );
};

export default FeedbackPage;
