import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action="">
        <label htmlFor="">
          Email
        <input type="email" name="" id="" />
        </label>
        <label htmlFor="">
          Password
          <input type="password" />
        </label>
      </form>
    </main>
  )
}
