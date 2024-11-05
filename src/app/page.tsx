"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Star, Shield, Zap } from "lucide-react"
import { client } from "./client";
import { ConnectButton, lightTheme, MediaRenderer, TransactionButton, useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { useReadContract } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";


export default function NFTClaimPage() {
  const account = useActiveAccount();

  // Log the account to check if it's available
  console.log("Active account:", account);

  const contract = getContract({
    client: client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string
  });

  const {data: contractMetadata, isLoading} = useReadContract(
    getContractMetadata,{
      contract: contract,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(contractMetadata);
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-100">
        <div className="text-2xl font-bold">NFT Claim</div>
        {/*<Button variant="outline" className="text-black border-black hover:bg-gray-200">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>*/}
        <ConnectButton 
          client={client} 
          theme={lightTheme()}
          connectButton={{
            label:"Connect Wallet",
          }}
        />
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {/*<img
                src="/placeholder.svg?height=400&width=400"
                alt="NFT Preview"
                className="rounded-lg shadow-2xl"
                width={400}
                height={400}
              />*/}
              <MediaRenderer
                client={client}
                src={contractMetadata?.image || ""}
                width="400"
                height="400"
                style={{
                  borderRadius:"1rem",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0px 1px 2px 0px rgba(16,2,40,0.06)",
                }}
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">{contractMetadata?.name}</h1>
              <p className="text-xl text-gray-600">
                {contractMetadata?.description || "No description available"}
              </p>
              {/*<Button size="lg" className="text-lg">
                Claim NFT
              </Button>*/}
              <TransactionButton
                transaction={async () => {
                  if (!account?.address) {
                    throw new Error("No active account");
                  }
                  return claimTo({
                    contract: contract,
                    to: account.address,
                    quantity: BigInt(1),
                  });
                }}
                onTransactionConfirmed={async () => alert("Transaction confirmed")}
                onError={(error) => {
                  console.error("Transaction error:", error);
                  alert(`Error: ${error.message}`);
                }}
              >
                Claim 1 NTF
              </TransactionButton>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Information */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                <h2 className="text-3xl font-bold">About the NFT</h2>
                <p className="text-gray-600">
                  This exclusive NFT is part of a limited collection created by renowned digital artist Jane Doe. Each piece is
                  uniquely generated and stored on the blockchain, ensuring its authenticity and scarcity.
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Artist Avatar"
                    className="rounded-full"
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="font-semibold">Created by</p>
                    <p className="text-xl">Jane Doe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Jane Doe"
                  className="rounded-lg shadow-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">About the Creator</h2>
                <h3 className="text-2xl font-semibold">Jane Doe</h3>
                <p className="text-gray-600">
                  Jane Doe is a world-renowned digital artist known for her innovative use of color and form in the NFT space. With over a decade of experience in traditional art, Jane transitioned to digital mediums in 2018 and quickly became a pioneer in the crypto art movement.
                </p>
                <p className="text-gray-600">
                  Her work has been featured in major digital art exhibitions around the world, and she has collaborated with leading brands in the tech and fashion industries. Jane's NFTs are highly sought after by collectors for their unique blend of abstract expressionism and futuristic themes.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <a href="#" className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    <a href="#" className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                  </Button>
                </div>
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
