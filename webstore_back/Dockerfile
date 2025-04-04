# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ["webstore_back/webstore_back.csproj", "webstore_back/"]
COPY ["webstore_back.BLL/webstore_back.BLL.csproj", "webstore_back.BLL/"]
COPY ["webstore_back.DAL/webstore_back.DAL.csproj", "webstore_back.DAL/"]
RUN dotnet restore "webstore_back/webstore_back.csproj"

# copy everything else and build app
COPY . .
WORKDIR /source/webstore_back
RUN dotnet publish -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "webstore_back.dll"]