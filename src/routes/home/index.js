import Charts from '../../components/charts';

export default function Home() {
  return (
    <section className='px-6 pt-2 bg-[#f8f8fb] min-h-[calc(100vh-54px)]'>
      <Charts />

      <div className='grid gap-4 pt-2 pb-8 lg:grid-cols-[2fr,1fr]'>
        <div className='relative p-4 bg-white rounded shadow-card'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='font-semibold text-[#223260]'>recent orders</h2>
            <button className='px-4 py-0.5 text-[#223260] capitalize transition-all duration-200 bg-white rounded hover:bg-[#223260] border border-[#223260] hover:text-white'>
              view all
            </button>
          </div>
          {/* <Table /> */}
        </div>

        <div className='relative p-4 bg-white rounded shadow-card'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='font-semibold text-[#223260]'>special customers</h2>
            <button className='px-4 py-0.5 text-[#223260] capitalize transition-all duration-200 bg-white rounded hover:bg-[#223260] border border-[#223260] hover:text-white'>
              view all
            </button>
          </div>
          {/* <Table /> */}
        </div>
      </div>
    </section>
  );
}

