
export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action="">
        <h1>Register</h1>
        <label htmlFor="">
          Email
        <input type="email" name="" id="" />
        </label>
        <label htmlFor="">
          Password
          <input type="password" />
        </label>
        <label htmlFor="">
          PointsCap
          <input type="number"  />
        </label>
    <label htmlFor="">
      Discord ID
      <input type="text" />
    </label>
      </form>
    </main>
  )
}
