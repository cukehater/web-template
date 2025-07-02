export default function Page() {
  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-20'>
      <form
        action=''
        className='flex flex-col gap-4 p-6 shadow-md min-w-sm rounded-md bg-white'
      >
        <input
          type='text'
          placeholder='ID를 입력해 주세요.'
          className='border-1 border-gray-200 rounded-md p-2 text-sm'
        />
        <input
          type='password'
          placeholder='비밀번호를 입력해 주세요.'
          className='border-1 border-gray-200 rounded-md p-2 text-sm'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
          Login
        </button>
      </form>
    </main>
  )
}
