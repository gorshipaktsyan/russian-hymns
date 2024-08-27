export default function clearInputs(
  setRusNumber: (value: string) => void,
  setEngNumber: (value: string) => void,
  setSearchedText: (value: string) => void
): void {
  setRusNumber('');
  setEngNumber('');
  setSearchedText('');
}
