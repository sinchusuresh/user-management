"use client"

import Link from "next/link"

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/users" className="navbar-brand">
          User Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/users" className="nav-link">
                Users
              </Link>
            </li>
          </ul>
          <button onClick={onLogout} className="btn btn-light">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

