import React, { Component } from 'react';
import { toast } from 'react-toastify';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    toast.error('Something went wrong. Please refresh the page.');
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h1>⚠️ Something Went Wrong</h1>
            <p>{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button onClick={this.resetError} className={styles.retryButton}>
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className={styles.homeButton}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
