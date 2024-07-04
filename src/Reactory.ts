"use strict";
import { SERVER_ENVIRONMENT, VERSION } from "./constants";

/**
  * A feature type
  */
enum FeatureType {
  "string",
  "number",
  "boolean",
  "date",
  "object",
  "array",
  "function",
  "symbol",
  "bigint"
}

enum ComponentDomain {
  "model",
  "service",
  "component",
  "plugin",
  "module",
  "function",
  "object",
  "enum",
  "interface",
  "type",
  "directive",
  "schema",
  "query",
  "mutation",
  "subscription",
  "resolver",
  "action",
  "event",
  "eventHandler",
  "eventListener",
  "eventEmitter",
  "eventDispatcher",
  "eventSubscriber",
  "eventPublisher",
  "eventProducer",
  "eventConsumer",
}

enum FunctionalServiceTypes {
  "file", // File handling services
  "data", // Data services
  "iot", // Internet of Things related services
  "email", // Email related services
  "notification", // Notification services
  "integration", // Services used for integration
  "authentication", // Authentication services
  "authorization", // Authorization services
  "billing", // Billing or payment related services
  "messaging", // Messaging services (e.g. chat, SMS)
  "logging", // Logging services
  "monitoring", // Monitoring or observability services
  "analytics", // Analytics services
  "search", // Search related services
  "database", // Database related services
  "cache", // Caching services
  "queue", // Queue services
  "stream", // Stream processing services
  "workflow", // Workflow services
  "network", // Network related services
  "storage", // Storage services
  "backup", // Backup services
  "scheduler", // Scheduling services
  "location", // Location services
  "security", // Security related services
  "reporting", // Reporting services
  "translation", // Translation services
  "ocr", // Optical Character Recognition services
  "ai", // AI or Machine Learning services
  "media", // Media processing services (audio, video)
  "cdn", // Content Delivery Network services
  "session", // Session management services
  "configuration", // Configuration services
  "rateLimiting", // Rate limiting services
  "abTesting", // A/B testing services
  "featureToggle", // Feature toggle services
  "event", // Event related services
  "custom", // Custom services
  "template", // Template related services
}

enum LifecycleServiceTypes {
  "codeGeneration", // Services used for code generation
  "codeAnalysis", // Services used for code analysis
  "schemaGeneration", // Services used for schema generation
  "schemaValidation", // Services used for schema validation
  "development", // Services used during development phase
  "testing", // Services used during testing phase
  "staging", // Services used during staging phase
  "production", // Services used during production phase
  "maintenance", // Services used for maintenance
  "debugging", // Services used for debugging
  "monitoring", // Services used for monitoring application health
  "logging", // Services used for logging
  "deployment", // Services used for deployment
  "continuousIntegration", // Services used for continuous integration
  "continuousDelivery", // Services used for continuous delivery
  "bugTracking", // Services used for bug tracking
  "issueTracking", // Services used for issue tracking
  "taskTracking", // Services used for task tracking
  "versionControl", // Services used for version control
  "codeReview", // Services used for code review
  "build", // Services used for build process
  "release", // Services used for release process
  "rollback", // Services used for rollback process
  "scaling", // Services used for scaling (vertical, horizontal)
  "loadBalancing", // Services used for load balancing
  "failover", // Services used for failover process
  "backupRestore", // Services used for backup and restore process
  "securityScanning", // Services used for security scanning
  "performanceTuning", // Services used for performance tuning
  "audit", // Services used for auditing
  "compliance", // Services used for compliance
  "documentation", // Services used for documentation
}

enum OrganizationalServiceTypes {
  "user", // Services intended for regular users
  "admin", // Services intended for administrators
  "superAdmin", // Services intended for super administrators
  "support", // Services intended for support teams
  "developer", // Services intended for developers
  "productOwner", // Services intended for product owners
  "stakeholder", // Services intended for stakeholders
  "businessAnalyst", // Services intended for business analysts
  "qa", // Services intended for QA teams
  "hr", // Services intended for human resources
  "finance", // Services intended for finance teams
  "marketing", // Services intended for marketing teams
  "sales", // Services intended for sales teams
  "legal", // Services intended for legal teams
  "operation", // Services intended for operations teams
  "security", // Services intended for security teams
  "auditor", // Services intended for auditors
  "compliance", // Services intended for compliance teams
  "training", // Services intended for training or education
  "projectManagement", // Services intended for project management teams
  "executive", // Services intended for executive users
  "customer", // Services intended for customers
  "partner", // Services intended for partners or third-party collaborators
  "supplier", // Services intended for suppliers
  "vendor", // Services intended for vendors
  "consultant", // Services intended for consultants
}

enum DomainServiceTypes {
  "customerManagement", // Services for customer management
  "productManagement", // Services for product management
  "inventoryManagement", // Services for inventory management
  "salesManagement", // Services for sales management
  "orderManagement", // Services for order management
  "paymentProcessing", // Services for payment processing
  "shipmentManagement", // Services for shipment management
  "accountManagement", // Services for account management
  "subscriptionManagement", // Services for subscription management
  "contractManagement", // Services for contract management
  "projectManagement", // Services for project management
  "taskManagement", // Services for task management
  "resourceManagement", // Services for resource management
  "documentManagement", // Services for document management
  "contentManagement", // Services for content management
  "knowledgeBase", // Services for knowledge base or FAQ
  "reporting", // Services for reporting
  "analytics", // Services for analytics
  "marketingAutomation", // Services for marketing automation
  "crm", // Services for Customer Relationship Management
  "erp", // Services for Enterprise Resource Planning
  "hr", // Services for human resources operations
  "financial", // Services for financial operations
  "manufacturing", // Services for manufacturing operations
  "logistics", // Services for logistics operations
  "supplyChain", // Services for supply chain operations
  "eCommerce", // Services for e-commerce operations
  "healthCare", // Services for healthcare operations
  "education", // Services for education operations
  "realEstate", // Services for real estate operations
  "legal", // Services for legal operations
  "itManagement", // Services for IT management operations
  "custom", // Custom domain-specific services
}

abstract class ReactoryService<P, C>  implements Reactory.Service.IReactoryService {
  description?: string;
  tags?: string[];
  nameSpace: string;
  name: string;
  version: string;
  props: P;
  context: C;

  toString?(includeVersion?: boolean): string {
    return `${this.nameSpace}.${this.name}${includeVersion ? `.${this.version}` : ''}`;
  }
}

class Service {
  static FunctionalServiceTypes = FunctionalServiceTypes;
  static LifecycleServiceTypes = LifecycleServiceTypes;
  static OrganizationalServiceTypes = OrganizationalServiceTypes;
  static DomainServiceTypes = DomainServiceTypes;
  static ReactoryService = ReactoryService;
}

/**
 * Reactory class is a container / static holder
 * for low level / core features.
 */
class ReactoryClass {
  static REACTORY_VERSION = VERSION;
  static REACTORY_ENVIRONMENT = SERVER_ENVIRONMENT;

  /**
   * Some core forms that are part of the system
   */
  static Forms = {};

  static FeatureType = FeatureType;

  static ComponentDomain = ComponentDomain;

  static Service = Service;
  
}


export default ReactoryClass;
