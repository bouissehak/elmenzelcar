export default function StorageImage({ url, alt, className, placeholderClassName }) {
  if (!url) {
    return (
      <div className={placeholderClassName || 'w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-400'}>
        —
      </div>
    );
  }

  return <img src={url} alt={alt || ''} className={className || 'w-12 h-12 rounded-lg object-cover border border-slate-200'} />;
}

