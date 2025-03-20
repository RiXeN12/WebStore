# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ["Dashboard.DAL/Dashboard.DAL.csproj", "Dashboard.DAL/"]
COPY ["Dashboard.BLL/Dashboard.BLL.csproj", "Dashboard.BLL/"]
COPY ["Dashboard.API/Dashboard.API.csproj", "Dashboard.API/"]
RUN dotnet restore "Dashboard.API/Dashboard.API.csproj"

# copy everything else and build app
COPY . .
WORKDIR /source/Dashboard.API
RUN dotnet publish -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Dashboard.API.dll"]