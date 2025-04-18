import Loader from '@/components/ui/Loader';
function Loading() {
  return (
    <div className='bg-background fixed inset-0 flex items-center justify-center z-50'>
      <Loader size='lg' variant='spinner' label='Загрузка...' />
    </div>
  )
}

export default Loading;