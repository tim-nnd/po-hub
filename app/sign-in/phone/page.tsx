import { Button } from "@/components/ui/Button";

export default function Page() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 rounded-lg">
        <h1 className="mb-8 text-3xl font-bold">PreOrdr</h1>
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold">
            Hi, <span className="text-secondary">&lt;username&gt;</span>!
          </h2>
          <p className="mb-8">We will need the following information for you to use our app</p>
        </div>
        <div className="w-full max-w-md">
          <div className="mb-2">
            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-secondary">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              defaultValue="+62 8785670921"
              className="w-full px-3 py-2 rounded-md"
            />
          </div>
          <p className="mb-8 text-sm text-secondary">this will be used for others to contact you</p>
          <Button variant="primary" className="w-full px-4 py-2">
            Complete Profile
          </Button>
        </div>
      </div>
    )
  }
  