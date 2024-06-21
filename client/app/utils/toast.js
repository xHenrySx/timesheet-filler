/**
 * Shows a error message in a toast
 */
export const showError = (toast, summary, detail) => {
  toast.current.show({
    severity: 'error',
    life: 3000,
    summary,
    detail,
  });
};

/**
 * Shows a success message in a toast
 */
export const showSuccess = (toast, summary, detail) => {
  toast.current.show({
    severity: 'success',
    life: 3000,
    summary,
    detail,
  });
};
