'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Star, Shield, Zap } from "lucide-react"

export function NftClaimPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-100">
        <div className="text-2xl font-bold">NFT Claim</div>
        <Button variant="outline" className="text-black border-black hover:bg-gray-200">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="NFT Preview"
              className="rounded-lg shadow-2xl"
              width={400}
              height={400}
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Claim Your Exclusive NFT</h1>
            <p className="text-xl text-gray-600">
              Don't miss out on this unique opportunity to own a piece of digital art history.
            </p>
            <Button size="lg" className="text-lg">
              Claim NFT
            </Button>
          </div>
        </div>
      </section>

      {/* NFT Information */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">About the NFT</h2>
            <p className="text-gray-600">
              This exclusive NFT is part of a limited collection created by renowned digital artist Jane Doe. Each piece is
              uniquely generated and stored on the blockchain, ensuring its authenticity and scarcity.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <img
                src="/placeholder.svg?height=64&width=64"
                alt="Artist Avatar"
                className="rounded-full"
                width={64}
                height={64}
              />
              <div className="text-left">
                <p className="font-semibold">Created by</p>
                <p className="text-xl">Jane Doe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and Benefits */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Holder Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="grid gap-6">
              {[
                { icon: Star, title: "Exclusive Access", description: "Get VIP access to future drops and events" },
                { icon: Shield, title: "Ownership Rights", description: "Full commercial rights to your NFT" },
              ].map((benefit, index) => (
                <Card key={index} className="bg-white border-gray-200 shadow">
                  <CardHeader>
                    <benefit.icon className="h-8 w-8 mb-2 text-black" />
                    <CardTitle className="text-black">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-6">
              {[
                { icon: Zap, title: "Staking Rewards", description: "Earn passive income by staking your NFT" },
                { icon: Wallet, title: "Airdrop Eligibility", description: "Qualify for future token airdrops" },
              ].map((benefit, index) => (
                <Card key={index} className="bg-white border-gray-200 shadow">
                  <CardHeader>
                    <benefit.icon className="h-8 w-8 mb-2 text-black" />
                    <CardTitle className="text-black">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}