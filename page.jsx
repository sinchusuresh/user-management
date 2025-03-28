"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

export default function EditUser() {
  const [user, setUser] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const userId = params.id

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchUser()
  }, [router, userId])

  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`)
      const data = await response.json()

      if (response.ok && data.data) {
        setUser(data.data)
        setFirstName(data.data.first_name)
        setLastName(data.data.last_name)
        setEmail(data.data.email)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch user details",
          variant: "destructive",
        })
        router.push("/users")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching user details",
        variant: "destructive",
      })
      router.push("/users")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "default",
        })
        router.push("/users")
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to update user",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating user",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Edit User</h2>

                {loading ? (
                  <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {user && (
                      <div className="text-center mb-4">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="user-avatar mb-3"
                        />
                        <h5>{`${user.first_name} ${user.last_name}`}</h5>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                          {submitting ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Updating...
                            </>
                          ) : (
                            "Update User"
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => router.push("/users")}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

