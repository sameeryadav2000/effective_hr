"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Zap, Lock, BarChart3, Mail, Menu, X } from "lucide-react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const features: Feature[] = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Approvals",
      description: "No more hunting through WhatsApp threads. All pending approvals in one place.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Complete Audit Trail",
      description: "Every approval, rejection, and comment is tracked. Who approved what, and when.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Export & Compliance",
      description: "Monthly exports ready for finance and audit. No manual spreadsheet work.",
    },
  ];

  const steps: Step[] = [
    {
      number: "1",
      title: "Submit",
      description: "Employees submit expense reimbursements, purchase requests, or leave requests.",
    },
    {
      number: "2",
      title: "Approve",
      description: "Managers review, approve or reject. Everything is logged automatically.",
    },
    {
      number: "3",
      title: "Export",
      description: "Finance marks as paid. One-click export for accounting and audits.",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "99",
      period: "/month",
      features: ["Up to 50 users", "All 3 request types", "Audit trail"],
    },
    {
      name: "Professional",
      price: "299",
      period: "/month",
      features: ["Up to 500 users", "All 3 request types", "API access", "Priority support"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited users", "Custom workflows", "Dedicated support"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-lg sm:text-xl font-bold tracking-tight">Request Hub</div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-2 cursor-pointer">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 py-4 space-y-3">
            <Link href="/login" className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">Stop managing approvals on WhatsApp</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Centralized approval workflows with audit trails. Replace WhatsApp, Viber, and Excel spreadsheets with a system built for
              business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:border-gray-400 transition">
                Book a Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">No credit card required. 14-day free trial.</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl h-80 sm:h-96 flex items-center justify-center border border-blue-100">
            <div className="text-center">
              <Mail className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">The Problem</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-red-500 mb-2">❌</div>
              <h3 className="font-semibold mb-2">Lost in Messages</h3>
              <p className="text-gray-600 text-sm">
                Approval requests buried in group chats. No one remembers who approved what.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-red-500 mb-2">❌</div>
              <h3 className="font-semibold mb-2">Excel Chaos</h3>
              <p className="text-gray-600 text-sm">
                Manual spreadsheets. Duplicate entries. Finance can't track approvals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-red-500 mb-2">❌</div>
              <h3 className="font-semibold mb-2">Zero Audit Trail</h3>
              <p className="text-gray-600 text-sm">
                Compliance nightmares. Can't prove who approved what or when.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">What You Get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature: Feature, idx: number) => (
            <div key={idx} className="p-6 sm:p-8 border border-gray-200 rounded-lg hover:border-blue-300 transition">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* How It Works */}
      {/* <section className="bg-gray-50 py-12 sm:py-20 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step: Step, idx: number) => (
              <div key={idx} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Request Types */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Built for Your Workflows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 sm:p-8">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="font-semibold text-lg mb-2">Expense Reimbursement</h3>
            <p className="text-gray-600 text-sm">
              Employees submit receipts. Managers approve. Finance marks as paid. Done.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="font-semibold text-lg mb-2">Purchase Requests</h3>
            <p className="text-gray-600 text-sm">
              Attach quotes. Get approval. Track budget. No surprise purchases.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 sm:p-8">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="font-semibold text-lg mb-2">Leave Requests</h3>
            <p className="text-gray-600 text-sm">
              Submit time off. Get manager sign-off. HR stays informed.
            </p>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-blue-600 text-white py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to modernize approvals?</h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8">
            Join teams that replaced WhatsApp approvals with a system built for scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 sm:px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 sm:px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section> */}

      {/* Pricing */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricingTiers.map((tier: PricingTier, idx: number) => (
            <div
              key={idx}
              className={`rounded-lg p-6 sm:p-8 ${tier.popular
                  ? 'border-2 border-blue-600 relative bg-blue-50'
                  : 'border border-gray-200'
                }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2">{tier.name}</h3>
              <p className="text-2xl sm:text-3xl font-bold mb-4">
                ${tier.price} <span className="text-sm sm:text-lg text-gray-600">{tier.period}</span>
              </p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature: string, featureIdx: number) => (
                  <li key={featureIdx} className="flex items-center gap-2 text-sm sm:text-base">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base ${tier.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Follow</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-xs sm:text-sm text-gray-600">
            <p>&copy; 2024 Request Hub. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
