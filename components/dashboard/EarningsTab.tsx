"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Calendar, CreditCard, Wallet } from "lucide-react"

// Mock earnings data
const earningsData = {
  total: 45200,
  thisMonth: 12800,
  lastMonth: 9600,
  pending: 3200,
  available: 42000,
  growth: 33.3,
}

const recentTransactions = [
  {
    id: "TXN-001",
    type: "sale",
    amount: 15000,
    product: "Handwoven Banarasi Silk Saree",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "TXN-002",
    type: "sale",
    amount: 2500,
    product: "Traditional Terracotta Vase",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "TXN-003",
    type: "withdrawal",
    amount: -5000,
    product: "Bank Transfer",
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "TXN-004",
    type: "sale",
    amount: 3200,
    product: "Silver Jhumka Earrings",
    date: "2024-01-12",
    status: "completed",
  },
]

export function EarningsTab() {
  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-warm-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-brown mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-deep-teal">₹{earningsData.total.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-heritage-gold/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-heritage-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-brown mb-1">This Month</p>
                <p className="text-2xl font-bold text-deep-teal">₹{earningsData.thisMonth.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-sage-green mr-1" />
                  <span className="text-xs text-sage-green">+{earningsData.growth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-sage-green/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sage-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-brown mb-1">Pending</p>
                <p className="text-2xl font-bold text-deep-teal">₹{earningsData.pending.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-sunset-orange/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-sunset-orange" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warm-brown/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-brown mb-1">Available</p>
                <p className="text-2xl font-bold text-deep-teal">₹{earningsData.available.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-soft-blue/10 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-soft-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-warm-brown/20">
        <CardHeader>
          <CardTitle className="text-deep-teal">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-warm-brown/10 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === "sale" ? "bg-sage-green/10" : "bg-warm-red/10"
                    }`}
                  >
                    {transaction.type === "sale" ? (
                      <TrendingUp
                        className={`w-5 h-5 ${transaction.type === "sale" ? "text-sage-green" : "text-warm-red"}`}
                      />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-warm-red" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-deep-teal">{transaction.product}</p>
                    <p className="text-sm text-warm-brown">
                      {transaction.id} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? "text-sage-green" : "text-warm-red"}`}>
                    {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge
                    className={`text-xs ${
                      transaction.status === "completed" ? "bg-sage-green text-white" : "bg-sunset-orange text-white"
                    }`}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
