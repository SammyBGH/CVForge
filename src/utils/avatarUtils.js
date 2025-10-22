export const getInitials = (name) => {
  if (!name) return 'U';
  
  // Remove any extra spaces and split into parts
  const names = name.trim().split(/\s+/);
  if (names.length === 1) return names[0][0].toUpperCase();
  
  // Get first and last initial
  return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
};

export const getAvatarStyles = (user) => {
  // If we have a photo URL, set it as background
  if (user?.photoURL) {
    return {
      backgroundColor: '#f0f0f0', // Fallback background
      overflow: 'hidden',
    };
  }
  
  // Generate a consistent color based on user's name or email
  const seed = user?.displayName || user?.email || 'user';
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B97B2', '#E8A87C', '#C38D9E', '#83AF9B'
  ];
  
  const colorIndex = 
    seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    
  return {
    backgroundColor: colors[colorIndex],
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  };
};
