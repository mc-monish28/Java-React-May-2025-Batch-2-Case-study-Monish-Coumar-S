# @Qualifier Annotation in Spring Core - Shape Example

This project demonstrates the usage of `@Qualifier` annotation in Spring Core concepts using Shape interface with Rectangle and Square implementations.

## What is @Qualifier Annotation?

The `@Qualifier` annotation is used in Spring Framework to specify which bean should be injected when there are multiple beans of the same type available in the Spring container. It helps resolve ambiguity during dependency injection.

## Key Concepts

### 1. **Bean Ambiguity Problem**
When Spring finds multiple beans of the same type, it doesn't know which one to inject:

```java
@Component("rectangle")
public class Rectangle implements Shape { ... }

@Component("square") 
public class Square implements Shape { ... }

@Service
public class ShapeCalculator {
    @Autowired
    private Shape shape; // Which one? Rectangle or Square?
}
```

### 2. **@Qualifier Solution**
Use `@Qualifier` to specify exactly which bean to inject:

```java
@Service
public class ShapeCalculator {
    @Autowired
    @Qualifier("rectangle")
    private Shape rectangle;
    
    @Autowired
    @Qualifier("square")
    private Shape square;
}
```

## Different Ways to Use @Qualifier

### 1. **Field Injection with @Qualifier**
```java
@Autowired
@Qualifier("rectangle")
private Shape rectangle;
```

### 2. **Constructor Injection with @Qualifier**
```java
@Autowired
public ShapeCalculator(@Qualifier("rectangle") Shape defaultShape) {
    this.defaultShape = defaultShape;
}
```

### 3. **Setter Injection with @Qualifier**
```java
@Autowired
@Qualifier("square")
public void setShape(Shape shape) {
    this.shape = shape;
}
```

### 4. **@Bean with @Qualifier**
```java
@Bean("customRectangle")
public Shape customRectangle() {
    return new Rectangle(10.0, 6.0);
}
```

## @Primary Annotation

When you have multiple beans of the same type, you can mark one as primary:

```java
@Bean
@Primary
public Shape primaryShape() {
    // This will be injected when no qualifier is specified
}
```

## Project Structure

```
src/main/java/com/hexaware/task3/
├── shape/
│   ├── Shape.java (Interface)
│   ├── Rectangle.java (Component with qualifier "rectangle")
│   └── Square.java (Component with qualifier "square")
├── service/
│   ├── ShapeCalculator.java (Uses @Qualifier for injection)
│   └── AdvancedShapeService.java (Uses @Primary and @Qualifier)
├── controller/
│   ├── ShapeController.java (REST endpoints)
│   └── AdvancedShapeController.java (Advanced endpoints)
└── config/
    └── ShapeConfig.java (@Bean definitions with @Primary and @Qualifier)
```

## API Endpoints

### Basic Shape Operations
- `GET /api/shapes/rectangle/area` - Calculate rectangle area
- `GET /api/shapes/square/area` - Calculate square area
- `GET /api/shapes/rectangle/perimeter` - Calculate rectangle perimeter
- `GET /api/shapes/square/perimeter` - Calculate square perimeter
- `GET /api/shapes/default` - Get default shape info
- `GET /api/shapes/all` - Get all shapes info

### Advanced Shape Operations
- `GET /api/advanced-shapes/primary` - Use @Primary bean
- `GET /api/advanced-shapes/custom-rectangle` - Use custom rectangle
- `GET /api/advanced-shapes/custom-square` - Use custom square
- `GET /api/advanced-shapes/all-custom` - Get all custom shapes info

## Running the Application

1. Start the Spring Boot application
2. Access the endpoints using a REST client or browser
3. Observe how different beans are injected based on @Qualifier values

## Key Benefits of @Qualifier

1. **Resolves Ambiguity**: Clearly specifies which bean to inject
2. **Flexibility**: Allows multiple implementations of the same interface
3. **Maintainability**: Makes code more readable and maintainable
4. **Testability**: Easier to mock specific implementations for testing

## Common Use Cases

1. **Multiple Database Configurations**: Different data sources
2. **Payment Gateways**: Multiple payment providers
3. **Logging Services**: Different logging implementations
4. **Cache Providers**: Different caching strategies
5. **Email Services**: Different email providers

This example demonstrates how @Qualifier helps Spring resolve dependency injection when multiple beans of the same type exist in the application context. 