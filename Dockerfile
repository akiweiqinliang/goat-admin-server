# 使用 Node.js 官方提供的 Node 镜像作为基础镜像
FROM node:16.20.0

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝到工作目录中
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 拷贝整个项目到工作目录中
COPY . .

# 暴露 Nest.js 应用程序的端口
EXPOSE 3000

# 启动 Nest.js 应用程序
CMD ["npm", "run", "start:dbprod"]
