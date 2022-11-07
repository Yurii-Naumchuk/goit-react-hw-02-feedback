import { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total
  }

  countPositiveFeedbackPercentage() {
    const { good } = this.state;
    
    return Math.round((good / this.countTotalFeedback()) * 100);
  }

  incrementStatistics = propertyName => {
    this.setState(prevState => {
      const value = prevState[propertyName];
      return {
        [propertyName]: value + 1,
      };
    });
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const goodPercent = this.countPositiveFeedbackPercentage();
      return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions incrementStatistics={this.incrementStatistics} />
        </Section>
        <Section title="Statistics">
          {' '}
          {total === 0 ? (
            <Notification />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              goodPercent={goodPercent}
              />
          )}
        </Section>
      </>
    );
  }
}
