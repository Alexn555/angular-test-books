// Utility service save books to local storage

// save item to an array
export function saveDataToStorage(data: any, storage = 'favourites'): boolean {
  let arr = [];
  // Parse the serialized data back into an aray of objects
  arr = JSON.parse(localStorage.getItem(storage)) || [];

  // Check on duplicates
  const exists = arr.filter(item => item.id === data.id);
  if (exists && exists.length > 0) {
    alert('You already this book to favourites!');
    return false;
  } else {
    // Push the new data (whether it be an object or anything else) onto the array
    arr.push(data);
    localStorage.setItem(storage, JSON.stringify(arr));
  }
  return true;
}

// remove item
export function removeFromStorage(itemId: string, storage = 'favourites'): void {
  let arr = [];
  arr = JSON.parse(localStorage.getItem(storage)) || [];

  // Remove from storage
  arr = arr.filter(item => {
    return item.id !== itemId;
  });
  localStorage.setItem(storage, JSON.stringify(arr));
}
