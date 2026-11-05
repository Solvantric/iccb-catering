export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString('en-IN')}`;
}

export const formatCurrencyBDT = formatCurrency;

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  // Handles both DD/MM/YYYY and ISO string
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    return dateString;
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatLongDate(dateString: string): string {
  if (!dateString) return '';
  if (dateString.includes('/') && dateString.split('/').length === 3) {
    const [d, m, y] = dateString.split('/').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}
