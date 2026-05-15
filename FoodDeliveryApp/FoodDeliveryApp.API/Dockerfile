# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["FoodDeliveryApp.API/FoodDeliveryApp.API.csproj", "FoodDeliveryApp.API/"]
RUN dotnet restore "FoodDeliveryApp.API/FoodDeliveryApp.API.csproj"

# Copy everything else
COPY . .

# Build and publish
WORKDIR "/src/FoodDeliveryApp.API"
RUN dotnet publish "FoodDeliveryApp.API.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "FoodDeliveryApp.API.dll"]