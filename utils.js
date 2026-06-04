// Utility handler for broken images (identical to original vanilla logic)
export const handleImageError = (e, originalPath, isCart = false) => {
    const img = e.target;
    const basePath = originalPath.substring(0, originalPath.lastIndexOf('.'));
    const attempts = parseInt(img.dataset.attempts || '0');
    const extensions = ['.jpg', '.png', '.jpeg', '.webp'];
    
    if (attempts < extensions.length) {
        img.dataset.attempts = attempts + 1;
        img.src = basePath + extensions[attempts];
    } else {
        img.src = isCart 
            ? 'https://placehold.co/50x50/e2e8f0/475569?text=X' 
            : 'https://placehold.co/400x300/e2e8f0/475569?text=Image+Not+Found';
    }
};