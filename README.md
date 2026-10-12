# Chronos Time Vault: Time-Weighted Staking & Liquidity Protocol

![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-blue)
![Hardhat](https://img.shields.io/badge/Framework-Hardhat-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

A non-custodial, time-weighted liquidity staking and programmatic token vesting protocol designed for EVM ecosystems. Chronos incentivizes long-term liquidity commitment via transparent curve-based yield multipliers.

---

## 🌟 Key Features

- **Dynamic Duration Multipliers**: Automatic basis-point reward weighting scaling from 1.0x to 2.0x based on lock-up duration (30 days to 365+ days).
- **Position Isolation**: Each user can open multiple concurrent staking positions with independent unlock schedules.
- **Circuit Breaker**: Governance pause switch to protect user assets during critical protocol upgrades.
- **Gas Optimized**: Streamlined storage slot utilization and packed struct layouts.

---

## 🏗 Architecture

```text
       +---------------------------------------------+
       |             Liquidity Provider              |
       +----------------------+----------------------+
                              |
                     stake(amount, duration)
                              |
                              v
       +----------------------+----------------------+
       |               TimeLockVault                 |
       |  - Calculates Multiplier (1.1x ~ 2.0x)      |
       |  - Records Non-Custodial Position           |
       +---------------------------------------------+
                              |
                   wait until unlockTimestamp
                              |
                              v
       +----------------------+----------------------+
       |               unstake(positionId)           |
       +---------------------------------------------+
```

---

## 🚀 Quick Start

### 1. Installation

```bash
git clone https://github.com/probableacade/chronos-time-vault.git
cd chronos-time-vault
npm install
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Run Automated Tests

```bash
npx hardhat test
```

### 4. Deploy

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
