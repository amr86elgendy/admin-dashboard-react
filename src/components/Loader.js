
const Loader = () => {
  return (
    <section className='flex flex-wrap items-center justify-center w-full min-h-screen'>
      <div className='relative w-40 h-40 loader two'>
        <span className='absolute top-2.5 left-2.5 right-2.5 bottom-2.5 bg-[#ffffff1a] rounded-full backdrop-blur border border-[#ffffff1a] z-20'></span>
        <span className='absolute top-0 left-0 z-10 block w-full h-full overflow-hidden rounded-full animate-loader before:absolute before:-top-1/2 before:-left-1/2 before:w-full before:h-full before:bg-primary'></span>
      </div>
    </section>
  );
};

export default Loader;
