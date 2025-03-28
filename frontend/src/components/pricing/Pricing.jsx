import PricingCard from "./PricingCard";

import '../../css/pricing.css';

const pricingPlans = [
    {
        key: 1,
        title: 'Starter Task',
        price: 'Free forever',
        benefits: [
            '1 workspace',
            'Up to 5 members',
            '100 tasks per month',
            '1GB storage',
            'Basic task management'
        ],
    },
    {
        key: 2,
        title: 'Busy Bee',
        price: 5,
        benefits: [
            '5 workspaces',
            'Up to 20 members',
            'Unlimited tasks',
            '10GB storage',
            'Task reminders',
            'Basic analytics'
        ],
    },
    {
        key: 3,
        title: 'Taskmaster',
        price: 10,
        benefits: [
            'Unlimited workspaces',
            'Up to 50 members',
            'Unlimited tasks',
            '100GB storage',
            'Advanced analytics',
            'Priority support',
            'Recurring tasks',
            'Custom branding'
        ],
    },
    {
        key: 4,
        title: 'Ultimate Doer',
        price: 15,
        benefits: [
            'Unlimited workspaces',
            'Unlimited members',
            'Unlimited tasks',
            '1TB storage',
            'Advanced workflow automation',
            'Premium support',
            'Custom integrations & API access',
            'Admin controls & security features'
        ],
    },
];


export default function Pricing() {
    return (
        <div className="pricing-wrapper">
            {pricingPlans.map((plan) => {
                return (
                    <PricingCard key={plan.key} props={plan} />
                )
            })}
        </div>
    )
}