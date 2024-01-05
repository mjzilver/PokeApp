# Build the image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy the .csproj to restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the files
COPY . ./

# Publish the app
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published files from build-env
COPY --from=build-env /app/out .

# Set the environment variable
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "PokeApp.dll"]
