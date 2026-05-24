const ProgressBar = ({ current = 1, total = 5 }) => {
  return (
    <div className="flex gap-2 px-4 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: i < current ? '#C0203A' : '#2A2A2A',
          }}
        />
      ))}
    </div>
  )
}

export default ProgressBar
